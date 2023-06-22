using Stripe;

namespace Shamazon.Models.Stripe
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddNewtonsoftJson();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // This is your test secret API key.
            StripeConfiguration.ApiKey = "sk_test_51N00WgELdS57KpTc4YYv93nHq3budPI4MXrViLYMNwvormMd8V9gqlf9kcSD2PZiQGb0WP97s99V2AK1dhcbBpTa00tljM7LxY";
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
