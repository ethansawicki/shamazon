using Shamazon.Models.Stripe;

namespace Shamazon.Contracts
{
    public interface IStripeAppService
    {
        Task<StripeCustomer> AddStripeCustomerAsync(AddStripeCustomer customer, CancellationToken cancellationToken);
        Task<StripePayment> AddStripePaymentAsync(AddStripePayment payment, CancellationToken cancellationToken);
    }
}
