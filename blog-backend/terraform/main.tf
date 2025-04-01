provider "aws" {
  region = "us-east-1"  # Change to your preferred region
}

resource "aws_ecr_repository" "backend_repo" {
  name = "backend-repo"
}

resource "aws_eks_cluster" "backend_cluster" {
  name     = "backend-cluster"
  role_arn = aws_iam_role.eks_role.arn
  vpc_config {
    subnet_ids = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
  }
}

resource "aws_iam_role" "eks_role" {
  name = "eks-cluster-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = { Service = "eks.amazonaws.com" },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_eks_node_group" "backend_nodes" {
  cluster_name    = aws_eks_cluster.backend_cluster.name
  node_group_name = "backend-nodes"
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }
}

resource "aws_iam_role" "eks_node_role" {
  name = "eks-node-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = { Service = "ec2.amazonaws.com" },
      Action = "sts:AssumeRole"
    }]
  })
}

output "ecr_repo_url" {
  value = aws_ecr_repository.backend_repo.repository_url
}

output "eks_cluster_name" {
  value = aws_eks_cluster.backend_cluster.name
}