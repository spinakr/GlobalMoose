// include Fake libs
#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open Fake.Testing

// Directories
let buildDir  = "./build/"
let deployDir = "./deploy/"


// Filesets
let appReferences  =
    !! "/**/*.csproj"
    ++ "/**/*.fsproj"

// version info
let version = "0.1"  // or retrieve from CI server

// Targets
Target "Clean" (fun _ ->
    CleanDirs [buildDir; deployDir]
)

Target "Build" (fun _ ->
    // compile all projects below src/app/
    MSBuildDebug buildDir "Build" appReferences
    |> Log "AppBuild-Output: "
)

Target "Deploy" (fun _ ->
    !! (buildDir + "/**/*.*")
    -- "*.zip"
    |> Zip buildDir (deployDir + "PortfolioManager." + version + ".zip")
)

Target "UnitTests" (fun _ ->
    !! (buildDir + "/*Tests.dll")
    |> NUnit3 (fun p ->
             { p with
                   ToolPath = "packages/NUnit.ConsoleRunner/tools/nunit3-console.exe" })
)

// Build order
"Clean"
  ==> "Build"
  ==> "UnitTests"
  ==> "Deploy"

// start build
RunTargetOrDefault "Build"
