import cafe1 from '../../../assets/img/cafe1.jpeg';
import cafe5 from '../../../assets/img/cafe5.jpeg';
import cafe3 from '../../../assets/img/cafe3.jpeg';




function carrusel() {
    return (
    <div className="container">
        <h1 className="text-center">Bienvenidos a Amorma Cafe</h1>
        <br />
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={cafe5} className="d-block w-100" alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img src={cafe1} className="d-block w-100" alt="Second slide"/>
                </div>
                <div className="carousel-item">
                    <img src={cafe3} className="d-block w-100" alt="third slide"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        





    </div>
    )
}

export default carrusel;