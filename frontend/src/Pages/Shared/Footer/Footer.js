import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <div className='w-100'>
            <footer className="footer animate__animated animate__fadeIn">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 d-flex">
                            <h5><i className="fas fa-cubes mt-2"></i></h5>

                            <div className="row">
                                <div className="col-6 ">
                                    <ul className="list-unstyled">
                                        <li><Link href="">Services</Link></li>
                                        <li><Link href="">Benefits</Link></li>
                                        <li><Link href="">Team</Link></li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className="list-unstyled">
                                        <li><Link href="">Documentation</Link></li>
                                        <li><Link href="">Support</Link></li>
                                        <li><Link href="">Legal Terms</Link></li>
                                        <li><Link href="">About</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <br />
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-md-right">Contact Us</h5>
                            <hr />
                            <ul className="nav d-flex align-items-center justify-content-center">
                                <li className="nav-item "><Link to="" className="nav-link pl-0"><i className="fab fa-facebook fa-lg"></i></Link></li>
                                <li className="nav-item"><Link to="" className="nav-link"><i className="fab fa-twitter fa-lg"></i></Link></li>
                                <li className="nav-item"><Link to="" className="nav-link"><i className="fab fa-instagram fa-lg"></i></Link></li>
                            </ul>
                        </div>
                        <div className="col-md-5">
                            <form>
                                <fieldset className="form-group pb-2 w-100">
                                    <input type="email" className="form-control w-100" id="exampleInputEmail1" placeholder="Enter email" />
                                </fieldset>
                                <fieldset className="form-group w-100">
                                    <textarea className="form-control w-100" id="exampleMessage" placeholder="Message"></textarea>
                                </fieldset>
                                <fieldset className="form-group text-xs-right">
                                    <button type="button" className="btn btn-secondary btn-md mt-3 fw-bold">Send</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Footer;