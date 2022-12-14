CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"visitCount" INTEGER NOT NULL DEFAULT 0,
	"createdAt" NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"token" TEXT NOT NULL
	"createdAt" NOT NULL DEFAULT NOW()
);