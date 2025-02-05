import { useState, useEffect } from "react";
import "./App.css";
import HeartSVG from "./assets/love.svg";
function App() {
    const [step, setStep] = useState(1);
    const [answer, setAnswer] = useState(null);
    const [noButtonPosition, setNoButtonPosition] = useState({ top: 50, left: 50 });
    const [lastIndex, setLastIndex] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Posiciones predefinidas (arriba, centro, abajo)
    const predefinedPositions = [
        { top: 50, left: 50 },
        { top: 50, left: 200 },
        { top: 50, left: 350 },
        { top: 200, left: 50 },
        { top: 200, left: 200 },
        { top: 200, left: 350 },
        { top: 350, left: 50 },
        { top: 350, left: 200 },
        { top: 350, left: 350 },
    ];

    const moveNoButton = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * predefinedPositions.length);
        } while (newIndex === lastIndex);

        setNoButtonPosition(predefinedPositions[newIndex]);
        setLastIndex(newIndex);
    };

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handleAccept = () => {
        setAnswer(true);
    };

    const handleReject = () => {
        setAnswer(false);
    };

    // Carrusel de imágenes
    const images = [
        "/images/foto.jpg",
        "/images/foto2.jpg",
        "/images/foto3.jpg",
        "/images/foto4.jpg",
    ];

    // Verificar que todas las imágenes estén cargadas
    useEffect(() => {
        const loadImages = () => {
            const imagePromises = images.map((src) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            );
            Promise.all(imagePromises)
                .then(() => setImagesLoaded(true))
                .catch(() => setImagesLoaded(false));
        };

        loadImages();
    }, []);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {step === 1 && (
                    <>
                        <h1>¡Hola, amor!</h1>
                        <p>Antes de empezar, quiero que sepas que eres increíble.</p>
                        <button onClick={handleNextStep}>Continuar</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1>Te tengo una pregunta muy importante...</h1>
                        <p>Pero primero, ¿te gustan los corazones? ❤️</p>
                        <button onClick={handleNextStep}>¡Claro que sí!</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        {!answer && (
                            <div>
                                <h1>Entonces, aquí va mi pregunta:</h1>
                                <p>¿Quieres ser mi San Valentín? 🌹</p>
                                <img src={HeartSVG} alt="Corazón" width={100} height={100} />

                            </div>
                        )}
                        <div className="heart">❤️</div>
                        <div className="buttons">
                            {!answer && (
                                <button className="accept" onClick={handleAccept}>
                                    ¡SÍ!
                                </button>
                            )}
                            {!answer && (
                                <button
                                    className="reject"
                                    style={{
                                        position: "absolute",
                                        top: `${noButtonPosition.top}px`,
                                        left: `${noButtonPosition.left}px`,
                                    }}
                                    onMouseEnter={moveNoButton}
                                    onClick={handleReject}
                                >
                                    No 😅
                                </button>
                            )}
                        </div>
                    </>
                )}

                {answer && imagesLoaded && (
                    <div>
                        {answer ? (
                            <>
                                <h1>❤️ ¡SABÍA QUE DIRÍAS SÍ! ❤️</h1>
                                <div className="carousel-container">
                                    <div className="carousel">
                                        <img
                                            src={images[currentImageIndex]}
                                            alt={`Image ${currentImageIndex + 1}`}
                                            className="carousel-image"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <h1>😅 Bueno... igual te amo. 😘</h1>
                        )}
                        <p>Gracias por ser parte de mi vida. ¡Feliz San Valentín!</p>
                    </div>
                )}

            </header>
        </div>
    );
}

export default App;
