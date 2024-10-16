import { Link } from 'react-router-dom';
import './404.scss';

const WrongPage = () => {
  return (
    <section className="page_404 max-w-screen-2xl mx-auto">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center "></h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2 text-2xl">
                  Look like you're lost
                </h3>
                <p>the page you are looking for not avaible!</p>
                <Link to={'/'} className="link_404">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WrongPage;