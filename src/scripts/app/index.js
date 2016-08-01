// pipwerks.SCORM.API.get()
pipwerks.SCORM.connection.initialize()
//
// pipwerks.SCORM.data.get()
// pipwerks.SCORM.data.set()
// pipwerks.SCORM.data.save()

// pipwerks.SCORM.status()
// pipwerks.SCORM.connection.terminate()

let val2 = pipwerks.SCORM.data.get('cmi.suspend_data')
$('#suspend_data2').val(val2)

$('#num2').text((i,val)=>pipwerks.SCORM.data.get('cmi.suspend_data').length)
$('#save_data_btn').on('click', ()=> {
  let val1 = $('#suspend_data')[0].value

  pipwerks.SCORM.data.set('cmi.suspend_data',val1)
  pipwerks.SCORM.data.save()

  let val2 = pipwerks.SCORM.data.get('cmi.suspend_data')
  $('#num1').text((i, val) => val1.length)
  $('#num2').text((i, val) => val2.length)
  $('#suspend_data2').val(val2)

})
