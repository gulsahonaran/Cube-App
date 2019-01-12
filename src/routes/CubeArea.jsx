import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, Screen } from 'styled-minimal';

const Input = styled.input`
  background: #121212;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  margin: 15px;
  height: 35px;
  font-size: 16px;
  padding: 5px;
`;
const Div = styled.div`
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0);
`;

export class CubeArea extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    global.length = 100;
    global.grid = 3;
    global.color = '#880E4F';
    global.scene = new THREE.Scene();
    global.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      global.length * 100,
    );
    global.renderer = new THREE.WebGLRenderer();
    global.renderer.setSize(window.innerWidth, window.innerHeight);
    global.geometry = new THREE.BoxGeometry(
      global.length,
      global.length,
      global.length,
      global.grid,
      global.grid,
      global.grid,
    );
    global.material = new THREE.MeshBasicMaterial({
      color: global.color,
      wireframe: true,
      needsUpdate: true,
    });
    global.cube = new THREE.Mesh(global.geometry, global.material);
  }

  componentDidMount() {
    this.createCube();
  }

  handleChangeLength = e => {
    global.length = parseFloat(e.target.value);
  };

  handleChangeGrid = e => {
    global.grid = parseFloat(e.target.value);
  };

  handleChangeColor = e => {
    global.color = e.target.value;
  };

  handleSubmit = e => {
    const temp = new THREE.BoxGeometry(
      global.length,
      global.length,
      global.length,
      global.grid,
      global.grid,
      global.grid,
    );
    console.log(global.color)
    const tempMaterial = new THREE.MeshBasicMaterial({
      color: global.color,
      wireframe: true,
      needsUpdate: true,
    });
    global.geometry = temp;
    global.material = tempMaterial;
    const tempCube = new THREE.Mesh(global.geometry, global.material);
    global.cube = tempCube;
    this.createCube();
  };

  createCube() {
    document.getElementById('cubearea').appendChild(global.renderer.domElement);
    global.scene.children = [];
    global.scene.add(global.cube);
    global.camera.position.z = 1000;
    global.cube.rotation.x = 0;
    global.cube.rotation.y = 0;
    function renderCube() {
      requestAnimationFrame(renderCube);
      global.cube.rotation.x += 0.01;
      global.cube.rotation.y += 0.01;
      global.renderer.render(global.scene, global.camera);
    }
    renderCube();
  }

  render() {
    return (
      <Screen key="CubeArea" data-testid="CubeAreaWrapper" id="cubearea">
        <Div>
          <Input
            onChange={this.handleChangeLength}
            type="number"
            placeholder="Edge Length of Cube"
          />
          <Input
            onChange={this.handleChmaxValueangeGrid}
            type="number"
            placeholder="Gridline Count of Cube"
            max={global.length / 10}
          />
          <Input onChange={this.handleChangeColor} placeholder="Color(#ffffff)" />
          <Button type="submit" onClick={this.handleSubmit}>
            Create
          </Button>
        </Div>
      </Screen>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(CubeArea);
