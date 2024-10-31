export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-16">
        <h1 className="text-5xl font-bold">18th Annual Engineering and Science Festival</h1>
        <p className="mt-6 text-xl font-light">
          Join us on Saturday, February 22, 2025, at Boise State for a day of exploration in STEM. Free event for K-12 students and families!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto"> {/* Limit the width of the sections */}
          {/* About Section */}
          <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              The College of Engineering at Boise State University will host the 18th Annual Engineering and Science Festival on February 22, 2025. This event aims to inspire over 4,000 K-12 students and their families to explore STEM fields.
            </p>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              The platform will feature internal building maps, customizable schedules, filters by age and topic, and push notifications for real-time updates. By offering these interactive tools, we aim to replace the current static websites and create a seamless, accessible experience for festival attendees.
            </p>
          </section>

          {/* What We Do Section */}
          <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">What We Do</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <div>Provide internal building maps to assist in navigating the event’s locations and sessions.</div>
              <div>Offer customizable schedules to help attendees plan their day based on personal interests.</div>
              <div>Include filtering options for activities by age group and topic.</div>
              <div>Implement push notifications to deliver real-time updates during the event.</div>
            </div>
          </section>

          {/* Meet the Team Section */}
          <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Meet the Team</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Josh Martin</h3>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Rachel Lawrence</h3>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Will England</h3>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Anthony Malang</h3>
              </div>
            </div>
          </section>

          {/* Sponsor Section */}
          <section className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Sponsor</h2>
            <p className="text-lg text-gray-700">Adriana Facundo, College of Engineering, Boise State University</p>
          </section>

          {/* Contact Us Section */}
          <section className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h2>
            <p className="text-lg text-gray-700">
              For more information, please contact us at <a href="mailto:adrianafacundo@boisestate.edu" className="text-blue-500 underline">adrianafacundo@boisestate.edu</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
