export default function NotFoundModal({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="modal modal-open overflow-hidden">
            <div className="modal-box bg-white relative">
                <div
                    className="absolute inset-0 bg-cover bg-center rounded-4xl"
                    style={{ backgroundImage: "url('/public/img/404NotFoundImg.png')" }}
                ></div>
                <div className="relative z-10 p-10 rounded-3xl">
                    <div className="grid grid-cols-11 grid-rows-2">
                        <h3 className="font-bold text-xl text-white col-start-1 col-end-6 row-start-1">Not Found</h3>
                        <p className="py-2 text-white col-start-1 col-end-7 row-start-2">No se encontró ninguna coincidencia</p>
                        <div className="modal-action col-start-12 row-start-2">
                            <button onClick={closeModal} className="btn btn-ghost text-white">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}