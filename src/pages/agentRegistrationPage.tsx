import AgentRegistrationForm from '@/components/forms/agentRegistrationForm/agentRegistrationForm'
import dayInsurance from '@/assets/icons/dayInsurance.svg'

function AgentRegistrationPage() {
  return (
    <div className="relative z-10">
      <div className="bg-primary absolute inset-x-0 top-0 h-60 rounded-b-[20px]"></div>
      <img
        src={dayInsurance}
        className="relative z-10 mx-auto w-28 py-8"
        alt="React logo"
      />
      <AgentRegistrationForm />
    </div>
  )
}

export default AgentRegistrationPage
