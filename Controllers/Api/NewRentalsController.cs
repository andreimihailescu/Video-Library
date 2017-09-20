using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Vidly.Dtos;
using Vidly.Models;
using System.Data.Entity;

namespace Vidly.Controllers.Api
{
    public class NewRentalsController : ApiController
    {
        private ApplicationDbContext _context;

        public NewRentalsController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        public IHttpActionResult CreateNewRentals(NewRentalDto newRental)
        {
            var customer = _context.Customers.Single(
                c => c.Id == newRental.CustomerId);

            var movies = _context.Movies.Where(
                m => newRental.MovieIds.Contains(m.Id)).ToList();

            foreach (var movie in movies)
            {
                if (movie.NumberAvailable == 0)
                    return BadRequest("Movie is not available.");

                movie.NumberAvailable--;

                var rental = new Rental
                {
                    Customer = customer,
                    Movie = movie,
                    DateRented = DateTime.Now
                };

                _context.Rentals.Add(rental);
            }

            _context.SaveChanges();

            return Ok();
        }

        public IHttpActionResult GetRentals()
        {
            var rentals = _context.Rentals.Include(r => r.Customer).Include(r => r.Movie).ToList();

            return Ok(rentals);
        }

        [HttpPut]
        public IHttpActionResult Returned(int id)
        {
            var rentalInDb = _context.Rentals.SingleOrDefault(m => m.Id == id);

            rentalInDb.DateReturned = DateTime.Now;
            rentalInDb.Customer = rentalInDb.Customer;
            rentalInDb.Movie = rentalInDb.Movie;

            _context.SaveChanges();

            return Ok();
        }
    }
}