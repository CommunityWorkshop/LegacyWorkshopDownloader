const { exec } = require('child_process')

export default function moveWindow(index: number) {
  exec(
    `Get-Desktop -Index ${index} | Move-Window (Get-ConsoleHandle)`,
    { shell: 'powershell.exe' },
    (error, stdout, stderr) => {
      // console.log(error, stdout, stderr)
      // do whatever with stdout
    }
  )
}
