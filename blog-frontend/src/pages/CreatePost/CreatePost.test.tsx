import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreatePost from "./CreatePost";
import "@testing-library/jest-dom";
import axios from "axios";
import { jest } from "@jest/globals";

jest.mock("axios"); 

describe("CreatePost Page", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("creates a post successfully", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: { message: "Post created!" } });

    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "New Post" } });
    fireEvent.change(screen.getByPlaceholderText("Body"), { target: { value: "Post content" } });

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => expect(screen.getByText("Post created!")).toBeInTheDocument());
  });

  it("shows an error message on API failure", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error("Failed to create post"));

    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "New Post" } });
    fireEvent.change(screen.getByPlaceholderText("Body"), { target: { value: "Post content" } });

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => expect(screen.getByText("Failed to create post")).toBeInTheDocument());
  });
});
