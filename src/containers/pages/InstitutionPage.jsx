import InstitutionForm from '../../components/InstitutionForm'
import SideBySide from '../SideBySide'
import { fillerText } from '../../utils/placeholder'

export default function InstitutionPage() {
  return (
    <>
      <SideBySide
        left={<div>{fillerText()}</div>}
        right={<InstitutionForm />}
      />
    </>
  )
}