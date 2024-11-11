import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-bsu-blue text-white w-full px-5 py-5 sticky">
      <section className="flex items-center justify-start">

        <div className="flex p-2 font-bold">
          <h2>Boise State University</h2>
          <span className="border-r-2 border-white pl-4 h-100"></span>
        </div>

        <div className="flex p-2 font-bold">
          <a href="tel: (208) 426-1000">(208) 426-1000</a>
          <span className="border-r-2 border-white pl-4 h-100"></span>
        </div>

        <div className="p-2">
          <address>1910 University Drive, Boise, Idaho 83725</address>
        </div>
      </section>
      <div className="pl-2 font-bold">
        <p>&copy; {new Date().getFullYear()} Boise State University. All rights reserved.</p>
      </div>
      <div className="flex p-2 font-bold">
          <p>V1.3</p>
        </div>
    </footer>
  );
}
