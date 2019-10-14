import React from 'react';
import Mirage from '../projects/mirage';
import SlowSide from '../projects/slow-side';

const ProjectMap = {
    'mirage': Mirage,
    'slow-side': SlowSide,
};

/**
 * Props.Project - Current active project ro show
 *
 * @param props - { project: string }
 * @returns {*}
 * @constructor
 */
export class Gallery extends React.PureComponent {
    state = {
        index: 0,
        project: null
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const project = prevState.project;
        let index = prevState.index;

        if (project !== nextProps.project) {
            index = 0;
        }

        return {
            index,
            project: nextProps.project,
        }
    }

    setIndex = (index) => {
        this.setState({
            index
        });
    };

    onNext = () => {
        let index = this.state.index;
        const currentProject = ProjectMap[this.props.project];
        const photosLength = currentProject.photos.length;

        if (index === photosLength) {
            index = 0;
        } else {
            index++;
        }

        this.setIndex(index);
    };

    onPreviouse = () => {
        let index = this.state.index;
        const currentProject = ProjectMap[this.props.project];
        const photosLength = currentProject.photos.length;

        if (index === 0) {
            index = photosLength;
        } else {
            index--;
        }

        this.setIndex(index);
    };

    render() {
        const project = ProjectMap[this.props.project];
        const currentImg = this.state.index;

        if (!project) {
            return (
                <h1>Project you are looking for doesnt exist yet :)</h1>
            )
        }

        const photo = project.photos[currentImg];

        return (
            <div className="gallery">
                <div className={'photo'}>
                    <img src={photo} alt="Photo unavailable." />
                </div>
                <div className="navigation">
                    <span onClick={this.onPreviouse}> &#60; <span>prev</span> </span><span onClick={this.onNext}> <span>next</span> ></span>
                </div>
            </div>
        );
    }
}
