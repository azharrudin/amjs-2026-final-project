using Microsoft.EntityFrameworkCore;
using NETCHARSP_BACKEND.Models;
using System;
namespace NETCHARSP_BACKEND.Persistence
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options)
        { }

        public DbSet<MsCustomer> Customers { get; set; } = null!;
        public DbSet<MsCar> MsCar { get; set; } = null!;
        public DbSet<TrRental> TrRental { get; set; } = null!;
        // C#
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MsCar>()
                .HasKey(c => c.CarId);

            modelBuilder.Entity<TrRental>()
                .HasOne(r => r.Car)
                .WithMany(c => c.Rentals)
                .HasForeignKey(r => r.CarId)
                .HasPrincipalKey(c => c.CarId);
            modelBuilder.Entity<MsCar>()
                .HasMany(c => c.Images)
                .WithOne(i => i.Car)
                .HasForeignKey(i => i.CarId)
                .HasPrincipalKey(c => c.CarId);
           
            modelBuilder.Entity<TrMaintenance>()
                .HasOne(m => m.Car)
                .WithMany(c => c.Maintenances)
                .HasForeignKey(m => m.CarId)
                .HasPrincipalKey(c => c.CarId);

            modelBuilder.Entity<TrMaintenance>()
                .HasOne(m => m.Employee)
                .WithMany(e => e.Maintenances)
                .HasForeignKey(m => m.EmployeeId)
                .HasPrincipalKey(e => e.EmployeeId);
        }
    }
}

