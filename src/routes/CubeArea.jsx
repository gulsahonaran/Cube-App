/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, Screen } from 'styled-minimal';

import * as THREE from 'three';

const Input = styled.input`
  background: #121212;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  margin: 15px;
  height: 35px;
  font-size: 16px;
  padding: 5px;
  min-width: 220px;
`;
const Select = styled.select`
  background: #121212;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  margin: 15px;
  height: 35px;
  font-size: 16px;
  padding: 5px;
  min-width: 120px;
`;
const Div = styled.div`
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0);
`;

export class CubeArea extends React.Component {
  constructor(props) {
    super(props);
    //Define variables and set default value for Threejs
    this.state = { colorV: '#880E4F', lengV: 100, gridV: 3 };
    global.aniResq = null;
    global.color = '#880E4F';
    // eslint-disable-next-line no-undef
    global.scene = new THREE.Scene();
    global.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      this.state.lengV * 100,
    );
    global.renderer = new THREE.WebGLRenderer();
    global.renderer.setSize(window.innerWidth, window.innerHeight);
    global.geometry = new THREE.BoxGeometry(
      this.state.lengV,
      this.state.lengV,
      this.state.lengV,
      this.state.gridV,
      this.state.gridV,
      this.state.gridV,
    );
    global.material = new THREE.MeshBasicMaterial({
      color: global.color,
      wireframe: true,
      needsUpdate: true,
    });
    global.cube = new THREE.Mesh(global.geometry, global.material);
    //
    this.handleChangeLength = this.handleChangeLength.bind(this);
    this.handleChangeGrid = this.handleChangeGrid.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    //trigger this function for first created
    this.createCube();
  }

  handleChangeLength = e => {
    //handle change length value and set state.lengV
    this.state.lengV = parseFloat(e.target.value);
    this.setState({ lengV: e.target.value });
  };

  handleChangeGrid = e => {
    //handle change grid count value and set state.gridV
    this.state.gridV = parseFloat(e.target.value);
    this.setState({ gridV: e.target.value });
  };

  handleChangeColor = e => {
    //handle change color value and set state.colorV
    global.color = e.target.value;
    this.setState({ colorV: e.target.value });
  };

  handleSubmit = () => {
    //handle click submit button and update cube
    //control validation for length and grid count value
    this.state.lengV = this.state.lengV > 10000 ? 10000 : this.state.lengV;
    this.state.lengV = this.state.lengV < 0 ? 0 : this.state.lengV;
    this.state.gridV = this.state.gridV > 200 ? 200 : this.state.gridV;
    this.state.gridV = this.state.gridV < 0 ? 0 : this.state.gridV;
    //set input value with new value
    document.getElementById('gridID').value = this.state.gridV;
    document.getElementById('lengID').value = this.state.lengV;
    //update cube
    const temp = new THREE.BoxGeometry(
      this.state.lengV,
      this.state.lengV,
      this.state.lengV,
      this.state.gridV,
      this.state.gridV,
      this.state.gridV,
    );
    const tempMaterial = new THREE.MeshBasicMaterial({
      color: global.color,
      wireframe: true,
      needsUpdate: true,
    });
    global.geometry = temp;
    global.material = tempMaterial;
    const tempCube = new THREE.Mesh(global.geometry, global.material);
    global.cube = tempCube;
    //reset cube animation
    window.cancelAnimationFrame(global.aniResq);
    //trigger this function for new cube
    this.createCube();
  };

  createCube() {
    //create canvas for cube
    document.getElementById('cubearea').appendChild(global.renderer.domElement);
    //set other configure
    global.scene.children = [];
    global.scene.add(global.cube);
    global.camera.position.z = 1000;
    global.cube.rotation.x = 0;
    global.cube.rotation.y = 0;
    //this function for animation
    function renderCube() {
      global.aniResq = window.requestAnimationFrame(renderCube);
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
            id="lengID"
            onChange={this.handleChangeLength}
            type="number"
            placeholder="Edge Length of Cube(100)"
          />
          <Input
            id="gridID"
            onChange={this.handleChangeGrid}
            type="number"
            placeholder="Gridline Count of Cube(3)"
          />
          <Select value={this.state.colorV} onChange={this.handleChangeColor}>
            <option value="#A1887F">Brown</option>
            <option value="#D50000">Red</option>
            <option value="#F57C00">Orange</option>
            <option value="#FFFF00">Yellow</option>
            <option value="#8BC34A">Green</option>
            <option value="#0288D1">Blue</option>
            <option value="#880E4F">Purple</option>
            <option value="#F48FB1">Pink</option>
            <option value="#FFFFFF">White</option>
          </Select>
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
