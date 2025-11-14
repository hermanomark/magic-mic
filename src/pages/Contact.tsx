import { Mail, Clock, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const Contact = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground mb-8">
        Have questions or need assistance? We're here to help!
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Information Cards */}
        <div className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                  <p className="text-muted-foreground mb-2">
                    Send us an email and we'll respond within 24-48 hours.
                  </p>
                  <a
                    href="mailto:support@example.com"
                    className="text-primary hover:underline"
                  >
                    support@example.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond to inquiries within 24-48 hours during
                    business days (Monday-Friday).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="hermano.mark.mh@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Card className="bg-muted border-none">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-background p-2 rounded-lg">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Important: Purchase & Order Inquiries
              </h3>
              <p className="text-muted-foreground mb-3">
                Since all purchases are made through eBay, we cannot assist with:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mb-3">
                <li>Order tracking or shipping status</li>
                <li>Returns, refunds, or exchanges</li>
                <li>Payment issues or billing questions</li>
                <li>Product defects or quality concerns</li>
              </ul>
              <p className="text-muted-foreground">
                For any purchase-related issues, please contact{" "}
                <a
                  href="https://www.ebay.com/help/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  eBay Customer Service
                </a>{" "}
                or the seller directly through your eBay account.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Can I buy products directly from your website?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No, our website is a product showcase. All purchases are completed
                on eBay. When you click "Buy Now" or product links, you'll be
                redirected to eBay to complete your purchase.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                How do I track my order?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Since orders are processed through eBay, you can track your order
                by logging into your eBay account and viewing your purchase
                history. You'll also receive tracking information via email from
                eBay.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                What is your return policy?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Returns are handled by eBay and the individual sellers. Each
                seller may have different return policies. Please check the return
                policy on the eBay listing before purchasing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Are the prices on your website final?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Prices shown on our website may not reflect current eBay prices.
                Always check the price on eBay before purchasing, as prices can
                change and may vary based on seller, shipping, and other factors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Do you offer wholesale or bulk purchasing?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                For wholesale or bulk orders, please contact us at{" "}
                <a
                  href="mailto:info@example.com"
                  className="text-primary hover:underline"
                >
                  info@example.com
                </a>
                . We can provide information about sellers who may accommodate
                bulk purchases.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Contact;