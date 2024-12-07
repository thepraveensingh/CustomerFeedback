import React from 'react'

const Feedback = () => {
  const handleSubmit = (e) =>{
    e.preventDefault();
    alert('form submitted')
  }
  return (
    <div>
      <div >

        <form>
          <label>
            Name : 
            <input className='border-2 border-black' type='text' placeholder='enter your name'></input>
          </label>
          <br/>
          <label>
            Category :
            <select required className='border-2 border-black' >
              <option value="">Select Category</option>
              <option value="features">Features</option>
              <option value="usage">Usage</option>
              <option value="price">Price</option>
            </select>
          </label>
          <br/>
          <label>
            Comments:
            <textarea placeholder='make additional comment here' className='border-2 border-black' >
            </textarea>
          </label>
          <br/>
          <label>
            Rate Us :
            <select required className='border-2 border-black' >
              <option value="">Choose rating</option>
              <option value='1'>poor</option>
              <option value='2'>fair</option>
              <option value='3'>good</option>
              <option value='4'>very good</option>
              <option value='5'>excellent</option>
            </select>
          </label>
          <br/>
          <button onClick={handleSubmit} className='bg-blue-500 text-white px-2 py-1 rounded-md'>Submit Feedback</button>
        </form>
      </div>
    </div>
  )
}

export default Feedback
