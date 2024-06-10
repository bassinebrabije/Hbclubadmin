import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Addc() {
    const [members, setMembers] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [selectedMemberImg, setSelectedMemberImg] = useState('');
    const [selectedTrainerImg, setSelectedTrainerImg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/trainers')
            .then(response => {
                setTrainers(response.data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/members')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleMemberChange = (e) => {
        const selectedFName = e.target.value;
        setSelectedMember(selectedFName);

        const selectedMemberData = members.find((member) => `${member.fname} ${member.lname}` === selectedFName);


        if (selectedMemberData) {
            setSelectedMemberImg(selectedMemberData.imagemembers);
        } else {
            setSelectedMemberImg('');
        }
    };

    const handleTrainerChange = (e) => {
        const selectedFName = e.target.value;
        setSelectedTrainer(selectedFName);


        const selectedTrainerData = trainers.find((trainer) => `${trainer.fname} ${trainer.lastname}` === selectedFName);


        if (selectedTrainerData) {
            setSelectedTrainerImg(selectedTrainerData.img);
        } else {
            setSelectedTrainerImg('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        const selectedMemberData = members.find((member) => `${member.fname} ${member.lname}` === selectedMember);

        if (selectedMemberData) {
            formData.append('member_id', selectedMemberData.id);
        }


        const selectedTrainerData = trainers.find((trainer) => `${trainer.fname} ${trainer.lastname}` === selectedTrainer);

        if (selectedTrainerData) {
            formData.append('trainer_id', selectedTrainerData.id);
        }

        axios.post('http://localhost:8000/api/coaching', formData).then(response => {
            setSelectedMember('');
            setSelectedTrainer('');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                window.location.href = '/Coaching';
            }, 2000);
            closeModal();
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-10">
                <button
                    className="flex items-center justify-center bg-red-600 text-white rounded-full p-4 shadow-md"
                    onClick={openModal}
                >
                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative p-4 w-full sm:max-w-[40rem] max-h-full bg-white rounded-lg shadow-lg z-50">
                        <div className="flex items-left pl-2 pb-2 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add Coaching
                            </h3>
                            <button onClick={closeModal} class="text-gray-400 bg-transparent hover:bg-[#FF0000] hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="members" className="block mb-2 text-sm font-medium text-gray-900">Members</label>
                                        <input
                                            list="members"
                                            value={selectedMember}
                                            onChange={handleMemberChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            required
                                        />
                                        <datalist id="members">
                                            {members.map((member) => (
                                                <option key={member.id} value={`${member.fname} ${member.lname}`}>{`${member.fname} ${member.lname}`}</option>
                                            ))}
                                        </datalist>
                                        {selectedMemberImg && (
                                            <div className="sm:pl-16  mt-4">
                                                <img
                                                    src={`http://localhost:8000/images/${selectedMemberImg}`}
                                                    alt="Selected Member"
                                                    className="w-32 h-32 object-cover "
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="trainers" className="block mb-2 text-sm font-medium text-gray-900">Trainers</label>
                                        <input
                                            list="trainers"
                                            value={selectedTrainer}

                                            onChange={handleTrainerChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            required
                                        />
                                        <datalist id="trainers">
                                            {trainers.map((trainer) => (
                                                <option key={trainer.id} value={`${trainer.fname} ${trainer.lastname}`}>{`${trainer.fname} ${trainer.lastname}`}</option>
                                            ))}
                                        </datalist>
                                        {selectedTrainerImg && (
                                            <div className="sm:pl-16 mt-4">
                                                <img
                                                    src={`http://localhost:8000/images/${selectedTrainerImg}`}
                                                    alt="Selected Trainer"
                                                    className="w-32 h-32 object-cover "
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-[#FF0000] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showAlert && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white border border-[#FF0000] ">
                                <svg className="h-6 w-6 " fill="none" stroke="#FF0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-3">Successful</h3>
                            <div className="px-7 py-3">
                                <p className="text-sm font-medium text-[#000] tracking-wides">Added successfully!</p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <a href="/Coaching" onClick={() => setShowAlert(false)} className="px-4 py-2 bg-[#FF0000] text-white text-base font-medium rounded-md w-96 shadow-sm">
                                    OK
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Addc;
