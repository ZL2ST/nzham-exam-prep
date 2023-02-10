const ActionButton = ({ action, label }) => {
  return (
    <>
      <button onClick={action}>
        {label}
      </button>
    </>
  )
};

export default ActionButton;
