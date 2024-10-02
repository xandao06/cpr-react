using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cpr_react.Server.Migrations
{
    /// <inheritdoc />
    public partial class CPR2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Hora",
                table: "Chamados",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hora",
                table: "Chamados");
        }
    }
}
