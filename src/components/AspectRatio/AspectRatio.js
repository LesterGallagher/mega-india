import React from 'react';
import styles from './AspectRatio.module.css';

export default props => {
    return (
        <div {...props} className={styles.AspectRatio}>
            <div className={styles.inner} style={{ paddingTop: props.ratio * 100 + '%'}}>
                <div className={styles.outer}>
                    <div className={styles.children}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

