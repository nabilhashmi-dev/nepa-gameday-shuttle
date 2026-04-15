import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="container py-12 pb-24 md:pb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-10">Have a question? We'd love to hear from you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="glass-card rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">(570) 555-0100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">info@nvhtransport.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Dunmore, PA 18512</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-lg p-6">
            <h3 className="font-semibold mb-3">Business Hours</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Monday – Friday: 8:00 AM – 8:00 PM</p>
              <p>Saturday – Sunday: 9:00 AM – 6:00 PM</p>
              <p className="text-xs mt-2">Response time: within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-4">
          <div><Label>Name *</Label><Input value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
          <div><Label>Email *</Label><Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" /></div>
          <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
          <div><Label>Message *</Label><Textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} /></div>
          <Button variant="hero" size="lg" type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
