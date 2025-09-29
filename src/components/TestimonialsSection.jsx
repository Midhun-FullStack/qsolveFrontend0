import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Engineering Student",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "QSolve's study materials helped me score 95% in my engineering entrance exam. The quality of questions and detailed solutions are exceptional!"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Medical Aspirant",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      text: "The comprehensive study bundles and 24/7 support made my NEET preparation so much easier. Highly recommend QSolve to every serious student."
    },
    {
      id: 3,
      name: "Ananya Patel",
      role: "Commerce Student",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "Thanks to QSolve, I cleared my CA Foundation with flying colors. The practice papers and mock tests were incredibly helpful."
    }
  ];

  return (
    <section className="py-5 bg-primary text-white position-relative overflow-hidden">
      {/* Background Pattern */}
      <div className="position-absolute w-100 h-100 opacity-10">
        <div style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1656926208209-a7528af41f02?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm4lMjBncmFkaWVudHxlbnwwfDB8fGJsdWV8MTc1ODg5NTIxN3ww&ixlib=rb-4.1.0&q=85")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%'
        }}></div>
      </div>

      <div className="container position-relative">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-4 fw-bold mb-3">
              What Our <span className="text-warning">Students Say</span>
            </h2>
            <p className="lead opacity-90">
              Join thousands of successful students who achieved their dreams with QSolve
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="col-lg-4 col-md-6">
              <div className="qsolve-testimonial-card h-100 p-4 text-dark">
                {/* Quote Icon */}
                <div className="mb-3">
                  <Quote size={24} className="text-primary opacity-50" />
                </div>

                {/* Rating */}
                <div className="d-flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className="text-warning me-1" 
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="mb-4 text-secondary">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="d-flex align-items-center">
                  <img 
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="qsolve-testimonial-avatar me-3"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div>
                    <div className="fw-bold text-dark">{testimonial.name}</div>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="row mt-5 pt-5 border-top border-light border-opacity-25">
          <div className="col-lg-3 col-6 text-center mb-4">
            <div className="h2 fw-bold mb-2">10,000+</div>
            <div className="opacity-75">Happy Students</div>
          </div>
          <div className="col-lg-3 col-6 text-center mb-4">
            <div className="h2 fw-bold mb-2">500+</div>
            <div className="opacity-75">Study Materials</div>
          </div>
          <div className="col-lg-3 col-6 text-center mb-4">
            <div className="h2 fw-bold mb-2">95%</div>
            <div className="opacity-75">Success Rate</div>
          </div>
          <div className="col-lg-3 col-6 text-center mb-4">
            <div className="h2 fw-bold mb-2">24/7</div>
            <div className="opacity-75">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;