using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cpr_react.Server.Migrations
{
    /// <inheritdoc />
    public partial class addTipoEquipamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tipo",
                table: "Equipamentos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Equipamentos");
        }
    }
}
