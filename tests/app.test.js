process.env.JWT_SECRET = "jest_test_secret";

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Node.js REST API Part 3", () => {
  test("GET / should return 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Node.js REST API Part 3");
  });

  test("GET /api/users without token should return 401", async () => {
    const response = await request(app).get("/api/users");

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
      message: "Invalid token",
      data: null,
    });
  });

  test("POST /api/auth/register rejects invalid email", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Adel",
      email: "adel",
      password: "Belajar123!",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  test("POST /api/auth/register rejects weak password", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Adel",
      email: "adel@example.com",
      password: "123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Weak password");
  });

  test("GET /api/profile with valid token returns user", async () => {
    const token = jwt.sign(
      {
        id: 1,
        name: "Adel Aulia",
        email: "adel@example.com",
      },
      process.env.JWT_SECRET,
    );

    const response = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.email).toBe("adel@example.com");
  });

  test("GET /api/profile with invalid token returns 401", async () => {
    const response = await request(app)
      .get("/api/profile")
      .set("Authorization", "Bearer token-salah");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid token");
  });
});
