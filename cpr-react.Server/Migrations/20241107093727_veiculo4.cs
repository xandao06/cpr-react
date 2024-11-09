using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cpr_react.Server.Migrations
{
    /// <inheritdoc />
    public partial class veiculo4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Registros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataRevisao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataAbastecimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataOleo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataBalanceamento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Marca = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modelo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrecoAbastecimento = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quilometragem = table.Column<int>(type: "int", nullable: true),
                    Placa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Observacao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParaConsertar = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registros", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Registros");
        }
    }
}
