export default function NotFoundModal({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="modal modal-open overflow-hidden">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Not Found</h3>
                <p className="py-4">No se encontró ninguna coincidencia</p>
                <div className="modal-action">
                    <button onClick={closeModal} className="btn">Cerrar</button>
                </div>
            </div>
        </div>
    );
}