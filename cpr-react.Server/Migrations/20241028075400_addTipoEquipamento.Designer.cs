﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using cpr_react.Server.Persistence;

#nullable disable

namespace cpr_react.Server.Migrations
{
    [DbContext(typeof(CPRDbContext))]
    [Migration("20241028075400_addTipoEquipamento")]
    partial class addTipoEquipamento
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("cpr_react.Server.Chamado", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Cliente")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Contrato")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Hora")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opcoes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Urgencia")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Chamados");
                });

            modelBuilder.Entity("cpr_react.Server.Equipamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Cliente")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Contrato")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Hora")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Marca")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Modelo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NumeroSerie")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Preco")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Quantidade")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tipo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Equipamentos");
                });

            modelBuilder.Entity("cpr_react.Server.Produto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CodigoSistema")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataEntrada")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataSaida")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EntradaOuSaida")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Hora")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Marca")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Modelo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NumeroSerie")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Observacao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("PrecoCusto")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("PrecoVenda")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Produtos");
                });
#pragma warning restore 612, 618
        }
    }
}
