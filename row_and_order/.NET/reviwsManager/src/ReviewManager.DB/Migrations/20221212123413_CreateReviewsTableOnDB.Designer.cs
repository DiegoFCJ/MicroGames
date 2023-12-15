﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReviewsSvc.DB;

#nullable disable

namespace ReviewManager.DB.Migrations
{
    [DbContext(typeof(ReviewsSvc.DB.AppContext))]
    [Migration("20221212123413_CreateReviewsTableOnDB")]
    partial class CreateReviewsTableOnDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ReviewsSvc.DB.Model.ReviewsEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("review_id");

                    b.Property<int>("MovieId")
                        .HasColumnType("int")
                        .HasColumnName("movie_id");

                    b.Property<string>("Review")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("review");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.ToTable("reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
