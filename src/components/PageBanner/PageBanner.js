import React, { Component } from 'react';
import styles from './PageBanner.module.css';

class PageBanner extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { image, avatar, colors, renderFab, title, height } = this.props;
        return (
            <div className={styles.PageBanner} style={{ backgroundImage: `url(${image})`, height }}>\
                <div className={styles.PageBannerColorOverlay} style={{ backgroundColor: colors.secondary }} />
                <div className={styles.bannerContent}>
                    <div className={styles.title}>
                        <h4>{title}</h4>
                    </div>
                    {avatar
                        ? <div>
                            <img className={styles.avatar} src={avatar} alt="Avatar" height={100} />
                        </div>
                        : null}
                    {renderFab()}
                </div>
            </div>
        );
    }
}

export default PageBanner;
