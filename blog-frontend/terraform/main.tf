provider "aws" {
  region = "us-east-1"  # Change this to your desired region
}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "my-react-app-bucket"  # Change this to a unique bucket name

  website {
    index_document = "index.html"
    # You can optionally configure an error page (e.g., 404.html) here
    # error_document = "error.html"
  }

  # Enable versioning if you want to track versions of your files
  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_object" "frontend_object" {
  for_each = fileset("build", "**/*")  # Assumes your build folder is called 'build'

  bucket = aws_s3_bucket.frontend_bucket.bucket
  key    = each.value
  source = "build/${each.value}"
  acl    = "public-read"
}

resource "aws_cloudfront_distribution" "frontend_distribution" {
  origin {
    domain_name = aws_s3_bucket.frontend_bucket.website_endpoint
    origin_id   = "S3-frontend"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/E1234567890"  # Optional: Restrict direct S3 access
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for React app"
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id = "S3-frontend"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods {
      items = ["GET", "HEAD"]
    }

    forwarded_values {
      query_string = false
    }
  }

  price_class = "PriceClass_100"  # Choose pricing class (e.g., "PriceClass_100" for lower cost)
  
  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:region:account-id:certificate/certificate-id"  # Add an ACM cert ARN for HTTPS (optional)
    ssl_support_method   = "sni-only"
  }
}

output "frontend_url" {
  value = aws_cloudfront_distribution.frontend_distribution.domain_name
}
