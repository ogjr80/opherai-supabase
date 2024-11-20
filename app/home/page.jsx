'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar,  Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FaRocket, FaChartLine, FaUsers, FaLightbulb, FaBriefcase, FaGraduationCap, FaHandshake, FaUser, FaRobot, FaStar } from 'react-icons/fa';
import Link from 'next/link';
const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'employers', 'candidates', 'investors', 'testimonials'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 200 && scrollPosition < offsetTop + offsetHeight - 200) {
            setActiveSection(section);
            // setIsVisible(true);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock data for charts (same as before)
  const userGrowthData = [
    { month: 'Jan', users: 1000 },
    { month: 'Feb', users: 2000 },
    { month: 'Mar', users: 3500 },
    { month: 'Apr', users: 5000 },
    { month: 'May', users: 7500 },
    { month: 'Jun', users: 10000 },
  ];

  const jobCategoriesData = [
    { name: 'Tech', value: 400 },
    { name: 'Finance', value: 300 },
    { name: 'Marketing', value: 200 },
    { name: 'Design', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Navigation */}
      <motion.nav
        className="bg-gray-900 shadow-lg fixed w-full z-10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <motion.a
            className="font-bold text-2xl text-blue-400"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Opher
          </motion.a>
          
          {/* Centered Menu */}
          <div className="hidden md:flex space-x-8">
            {['Features', 'Employers', 'Candidates', 'Investors'].map((item) => (
              <motion.a
                key={item}
                className={`text-lg hover:text-blue-400 transition-colors ${
                  activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'
                }`}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Right-aligned buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <motion.button
                className="text-white px-6 py-2 rounded-full text-lg font-semibold hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
            <Link href="/getting-started">
              <motion.button
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.h1
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            variants={fadeInUp}
          >
            AI-Powered Job Marketplace
          </motion.h1>
          <motion.p
            className="text-2xl mb-12 text-gray-300"
            variants={fadeInUp}
          >
            Connecting Talent with Opportunities
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            variants={fadeInUp}
          >
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              For Employers
            </motion.button>
            <motion.button
              className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              For Job Seekers
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-800">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Platform Features
        </motion.h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: FaRocket, title: 'AI-Powered Matching', description: 'Our advanced algorithms ensure perfect matches between candidates and job openings.' },
            { icon: FaChartLine, title: 'Skill Assessments', description: 'Comprehensive tests to evaluate and showcase candidates technical and soft skills.' },
            { icon: FaUsers, title: 'Talent Pool', description: 'Access a diverse pool of pre-vetted, skilled professionals across various industries.' },
            { icon: FaLightbulb, title: 'Real-time Analytics', description: 'Detailed insights and reporting for both employers and job seekers.' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="text-5xl text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          How Opher Works
        </motion.h2>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8">
          {[
            { title: "Create Profile", description: "Sign up and build your comprehensive profile or job listing.", icon: FaUser },
            { title: "AI Matching", description: "Our algorithms find the best matches for candidates and employers.", icon: FaRobot },
            { title: "Connect", description: "Engage with potential employers or candidates through our platform.", icon: FaHandshake },
            { title: "Success", description: "Find your ideal job or perfect candidate and achieve your goals.", icon: FaStar },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <step.icon className="text-5xl text-blue-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Employers Section */}
      <section id="employers" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            For Employers
          </motion.h2>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-semibold mb-6">Find Your Perfect Candidates</h3>
              <ul className="space-y-4 text-lg">
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaBriefcase className="text-blue-400 mr-4" />
                  Access a pool of pre-vetted, skilled professionals
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaChartLine className="text-blue-400 mr-4" />
                  Use AI-driven matching to find the best fit for your team
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaUsers className="text-blue-400 mr-4" />
                  Streamline your hiring process and reduce time-to-hire
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaLightbulb className="text-blue-400 mr-4" />
                  Get detailed analytics on your job postings and applicants
                </motion.li>
              </ul>
            </motion.div>
            <motion.div
              className="lg:w-1/2 h-96"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobCategoriesData}>
                  <Bar dataKey="value" fill="#3B82F6">
                    {jobCategoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                  <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Candidates Section */}
      <section id="candidates" className="py-20 px-6 bg-gray-800">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            For Candidates
          </motion.h2>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-semibold mb-6">Accelerate Your Career Growth</h3>
              <ul className="space-y-4 text-lg">
                <motion.li className="flex items-center" whileHover={{ x: -10 }}>
                  <FaGraduationCap className="text-purple-400 mr-4" />
                  Showcase your skills with our comprehensive assessment platform
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: -10 }}>
                  <FaHandshake className="text-purple-400 mr-4" />
                  Get matched with jobs that align with your career goals
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: -10 }}>
                  <FaChartLine className="text-purple-400 mr-4" />
                  Track your application status and receive real-time updates
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: -10 }}>
                  <FaLightbulb className="text-purple-400 mr-4" />
                  Access personalized career development resources
                </motion.li>
              </ul>
            </motion.div>
            <motion.div
              className="lg:w-1/2 h-96"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <Area type="monotone" dataKey="users" stroke="#8B5CF6" fill="url(#colorUsers)" />
                  <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section id="investors" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            For Investors
          </motion.h2>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-semibold mb-6">Join the Future of Hiring</h3>
              <ul className="space-y-4 text-lg">
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaRocket className="text-green-400 mr-4" />
                  Invest in a rapidly growing AI-driven job marketplace
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaChartLine className="text-green-400 mr-4" />
                  Tap into the $200+ billion global recruitment market
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaUsers className="text-green-400 mr-4" />
                  Benefit from our innovative approach to solving the skills gap
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 10 }}>
                  <FaLightbulb className="text-green-400 mr-4" />
                  Access detailed analytics and growth projections
                </motion.li>
              </ul>
            </motion.div>
            <motion.div
              className="lg:w-1/2 h-96"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} />
                  <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gray-800">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { quote: "Opher transformed our hiring process. We found top talent faster than ever before.", author: "Sarah J., HR Director" },
            { quote: "The skill assessments helped me showcase my abilities and land my dream job.", author: "Michael T., Software Engineer" },
            { quote: "As an investor, I'm impressed by the platform's growth and innovative approach.", author: "Alex R., Venture Capitalist" },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="italic text-lg mb-6">&quot;{testimonial.quote}&quot;</p>
              <p className="font-semibold text-blue-400">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-800 w-full">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="container mx-auto max-w-3xl">
          {[
            { question: "How does Opher's AI matching work?", answer: "Our AI algorithms analyze job requirements and candidate profiles to create optimal matches based on skills, experience, and cultural fit." },
            { question: "Is Opher suitable for all industries?", answer: "Yes, Opher caters to a wide range of industries, from tech and finance to healthcare and creative fields." },
            { question: "How can I get started as an employer?", answer: "Simply sign up for an account, create your company profile, and start posting jobs. Our team will guide you through the process." },
            // Add more FAQ items as needed
          ].map((item, index) => (
            <motion.div
              key={index}
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-2 text-white">{item.question}</h3>
              <p className="text-gray-300">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career or Hiring Process?</h2>
          <p className="text-2xl mb-12">Join thousands of companies and candidates already benefiting from Opher.</p>
          <motion.button
            className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Opher</h3>
            <p className="text-gray-400">Transforming the future of hiring with AI-powered solutions.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#employers" className="text-gray-400 hover:text-blue-400 transition-colors">For Employers</a></li>
              <li><a href="#candidates" className="text-gray-400 hover:text-blue-400 transition-colors">For Candidates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: info@opher.co.za</p>
            <p className="text-gray-400">Phone: +27 (11) 312-6283</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>&copy; 2024 Opher. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;