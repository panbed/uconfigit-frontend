import { fillerText } from '../../utils/placeholder'

function TestPage() {
  return (
    <>
      <div className='flex-col'>
        {fillerText()}
      </div>
    </>
  )
}

export default TestPage