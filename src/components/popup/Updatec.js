import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Updatec({ isModalOpen, closeModal, coachId }) {
    const [members, setMembers] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [selectedMemberImg, setSelectedMemberImg] = useState('');
    const [selectedTrainerImg, setSelectedTrainerImg] = useState('');
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

    useEffect(() => {
        if (coachId) {
            axios.get(`http://localhost:8000/api/coaching/${coachId}`)
                .then(response => {
                    const coachingData = response.data;
                    // Access member data
                    const member = coachingData.member;
                    setSelectedMember(`${member.fname} ${member.lname}`);
                    setSelectedMemberImg(member.imagemembers);
                    // Access trainer data
                    const trainer = coachingData.trainer;
                    setSelectedTrainer(`${trainer.fname} ${trainer.lastname}`);
                    setSelectedTrainerImg(trainer.img);
                })
                .catch(error => console.error('There was an error!', error));
        }
    }, [coachId]);

    const handleMemberChange = (e) => {
        const selectedName = e.target.value;
        setSelectedMember(selectedName);
        // Find the selected member from the members list
        const selectedMemberData = members.find((member) => `${member.fname} ${member.lname}` === selectedName);
        // Set the image URL if the member is found
        if (selectedMemberData) {
            setSelectedMemberImg(selectedMemberData.imagemembers);
        } else {
            setSelectedMemberImg('');
        }
    };

    const handleTrainerChange = (e) => {
        const selectedName = e.target.value;
        setSelectedTrainer(selectedName);
        // Find the selected trainer from the trainers list
        const selectedTrainerData = trainers.find((trainer) => `${trainer.fname} ${trainer.lastname}` === selectedName);
        // Set the image URL if the trainer is found
        if (selectedTrainerData) {
            setSelectedTrainerImg(selectedTrainerData.img);
        } else {
            setSelectedTrainerImg('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Find the selected member by name to get the ID
        const selectedMemberData = members.find((member) => `${member.fname} ${member.lname}` === selectedMember);
        // Find the selected trainer by name to get the ID
        const selectedTrainerData = trainers.find((trainer) => `${trainer.fname} ${trainer.lastname}` === selectedTrainer);

        if (selectedMemberData && selectedTrainerData) {
            const formData = {
                member_id: selectedMemberData.id,
                trainer_id: selectedTrainerData.id
            };

            axios.put(`http://localhost:8000/api/coaching/${coachId}`, formData)
                .then(() => {
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                        window.location.href = '/Coaching';
                    }, 2000);
                    closeModal();
                })
                .catch(error => console.error('There was an error!', error));
        } else {
            console.error('Invalid member or trainer selection.');
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative p-4 w-full max-w-3xl max-h-full bg-white rounded-lg shadow-lg z-50">
                        <div className="flex items-left pl-2 pb-2 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Update Coaching
                            </h3>
                            <button onClick={closeModal} class="text-gray-400 bg-transparent hover:bg-[#FF0000] hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4">
                            <form className="space-y-4" onSubmit={handleSubmit}>
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
                                            <div className="sm:pl-16 mt-4">
                                                <img
                                                    src={`http://localhost:8000/images/${selectedMemberImg}`}
                                                    alt="Selected Member"
                                                    className="w-32 h-32 object-cover"
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
                                                    className="w-32 h-32 object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-[#008000] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAlert && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white border border-[#FF0000]">
                                <svg className="h-6 w-6" fill="none" stroke="#FF0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-3">Successful</h3>
                            <div className="px-7 py-3">
                                <p className="text-sm font-medium text-[#000] tracking-wides">Updated successfully!</p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <a onClick={() => setShowAlert(false)} className="px-4 py-2 bg-[#FF0000] text-white text-base font-medium rounded-md w-96 shadow-sm">
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

export default Updatec;
