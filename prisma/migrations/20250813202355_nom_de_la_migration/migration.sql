-- CreateTable
CREATE TABLE "public"."departments" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."communes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "population" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "communes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."artisans" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "postal_code" TEXT,
    "city" TEXT,
    "department_id" INTEGER,
    "website" TEXT,
    "description" TEXT,
    "services" TEXT[],
    "years_experience" INTEGER,
    "certifications" TEXT[],
    "insurance_valid" BOOLEAN NOT NULL,
    "siret" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artisans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contact_requests" (
    "id" SERIAL NOT NULL,
    "artisan_id" INTEGER NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_email" TEXT NOT NULL,
    "client_phone" TEXT,
    "project_type" TEXT,
    "project_description" TEXT,
    "budget_range" TEXT,
    "urgency" TEXT NOT NULL DEFAULT 'no_rush',
    "preferred_contact" TEXT NOT NULL DEFAULT 'email',
    "status" TEXT NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_slug_key" ON "public"."departments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "communes_slug_key" ON "public"."communes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "artisans_email_key" ON "public"."artisans"("email");

-- CreateIndex
CREATE UNIQUE INDEX "artisans_siret_key" ON "public"."artisans"("siret");

-- AddForeignKey
ALTER TABLE "public"."communes" ADD CONSTRAINT "communes_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."artisans" ADD CONSTRAINT "artisans_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact_requests" ADD CONSTRAINT "contact_requests_artisan_id_fkey" FOREIGN KEY ("artisan_id") REFERENCES "public"."artisans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
