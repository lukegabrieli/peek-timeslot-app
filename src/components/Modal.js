import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

function Modal({children, isOpen = false, onClose}) {
	return (
		<ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel='Modal'>
			<button onClick={onClose}>close modal</button>
			{children}
		</ReactModal>
	);
}

export default Modal;
