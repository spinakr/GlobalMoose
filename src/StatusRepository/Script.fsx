#r "..\..\packages\FSharp.Data\lib\\net40\FSharp.Data.dll"
#r "..\..\packages\FSharp.Configuration\lib\\net45\FSharp.Configuration.dll"
#load "StatusFileReader.fs"
open System.IO

open StatusFileReader



let statusUpdates = loadAllStatusUpdates()


for status in statusUpdates do
    printf "%A" statusUpdates.[0].Rows
