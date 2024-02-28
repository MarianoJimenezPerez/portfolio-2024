import { useState, type ChangeEvent, type FormEvent } from "react";

const initialFormState = {
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error when the user types
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const apiKey = import.meta.env.PUBLIC_CONTACT_API_KEY;
        const domain = import.meta.env.PUBLIC_CONTACT_DOMAIN;
        const mailgunEndpoint = `https://api.mailgun.net/v3/${domain}/messages`;

        const data = {
          from: formData.email,
          to: "marianojimenezperez1@gmail.com",
          subject: formData.subject,
          text: formData.message,
        };

        const response = await fetch(mailgunEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data),
        });

        if (response.ok) {
          setSubmitStatus("success");
          setFormData(initialFormState);
        } else {
          console.error("Error sending form:", response.statusText);
          setSubmitStatus("error");
        }
      } catch (error) {
        console.error("Error submitting form", error);
        setSubmitStatus("error");
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Form is not valid");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8 w-[100%]">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="name@domain.com"
          required
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Let me know how I can help you"
          required
        />
        {errors.subject && <p>{errors.subject}</p>}
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Leave a comment..."
          required
        ></textarea>
        {errors.message && <p>{errors.message}</p>}
      </div>
      <button
        type="submit"
        className={`bg-transparent hover:bg-denim-300 text-denim-300 font-semibold hover:text-white py-2 px-4 border border-denim-300 hover:border-transparent rounded ${
          loading ? "cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : submitStatus === "success"
          ? "Message Sent!"
          : "Send message"}
      </button>
      {submitStatus === "error" && (
        <p className="text-red-500">
          Error sending the form. Please try again.
        </p>
      )}
    </form>
  );
}
