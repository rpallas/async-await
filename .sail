<pipeline>
  <job image="node:8.11.13-alpine">
    <Run command="npm install" />
    <Run command="npm test" />
    <Branch when="^master$">
      <Run command="echo on master branch!" />
    </Branch>
  </job>
</pipeline>
