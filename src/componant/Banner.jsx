import background from '../assets/image/eden-constantino-iJg1YzsEfqo-unsplash.jpg'

const Banner = () => {
    return (
      
<div
  className="hero "
  style={{ backgroundImage: `url(${background})` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-xl">
      <h1 className="mb-5 text-5xl font-bold text-white"> Welcome to TaskMaster</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
     
    </div>
  </div>
</div>
 
    );
};

export default Banner;