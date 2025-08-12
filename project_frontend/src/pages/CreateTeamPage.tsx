import { useState } from "react"
import toast from "react-hot-toast"
import CreateTeamForm from "../components/CreateTeamForm"
import { getErrorMessage } from "../utils/getErrorMessage"
import { useForm } from "../hooks/useForm"
import { createTeam } from "../services/team_services"
import Modal from "../components/Modal"
import type { CreateTeamFormValue, TeamResponse } from "../types/team"
import { images } from "../core/images"
import { useNavigate } from "react-router"
import { validateCreateTeam } from "../utils/validators"

const CreateTeamPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [createdCode, setCreatedCode] = useState("")
    const navigate = useNavigate()
    const form = useForm<CreateTeamFormValue>({
        initialValues: {
            name: "",
            description: ""
        },
        validate: validateCreateTeam,
        onSubmit: async (values) => {
            try {
                const { message, team }: TeamResponse = await createTeam(values.name, values.description)
                toast.success(message)
                setCreatedCode(team.code)
                setModalOpen(true)
                navigate("/dashboard")
            } catch (err: unknown) {
                const msg = getErrorMessage(err)
                toast.error(msg)
            }
        }
    })

    const handleCopy = () => {
        navigator.clipboard.writeText(createdCode)
        toast.success("Código copiado al portapapeles")
    }

    return (
        <section className="w-full h-full flex items-center justify-center">
            <div className="max-w-xl mx-auto mt-20 p-6 min-h-[50vh] shadow rounded">
                <h2 className="text-2xl font-semibold mb-4 text-center text-white">Create Team</h2>
                <CreateTeamForm form={form} />

                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Enter the code of your team"
                    footer={
                        <div className="text-right mt-4">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    }
                >
                    <p className="text-gray-700 mb-4">
                        Share this code with your team members to join the team.
                    </p>
                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                        <span className="text-lg font-mono">{createdCode}</span>
                        <button
                            onClick={handleCopy}
                            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Copy
                        </button>
                    </div>
                </Modal>

            </div>
            <div className="relative w-full h-full">
                <img src={images.login} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
        </section>
    )
}

export default CreateTeamPage
