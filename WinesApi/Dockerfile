FROM microsoft/dotnet:latest

COPY ./ /winesapi
WORKDIR /winesapi
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "run"]