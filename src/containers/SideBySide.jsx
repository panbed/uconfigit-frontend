export default function SideBySide({ left, right }) {
  return (
    <div className='side-by-side flex-row justify-content-center gap-4 align-items-center'>
      <div className="w-50 h-75 scrollable">
        {left}
      </div>
      <div className="w-25">
        {right}
      </div>
    </div>
  )
}