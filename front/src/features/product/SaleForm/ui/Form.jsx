import { useSale } from "../model";
import { TextArea } from "shared/ui/TextArea";
import { StatusError } from "shared/ui/StatusError";
import { SubmitButton } from "shared/ui/SubmitButton";
import dndImage from "shared/assets/img/dragAndDrop.png";
import styles from "./Sale.module.css"

export function Form() {

    const {
        form, handlerForm, error, fields,
        handlerImage, asyncSendSaleInfo, isDndActive,
        dndDrop, dndEnterOver, dndLeaveDrop,
    } = useSale();
    
    return (
        <div className={[styles.sale, "fade"].join(" ")}>
            <div className={styles.saleBlock}>
                <div className={styles.productInfo}>
                    {fields.map(({ name, nameRu }) =>
                        <TextArea
                            key={name}
                            type="text"
                            value={form[name]}
                            name={name}
                            label={nameRu}
                            onChange={handlerForm}
                        />
                    )}
                    <StatusError message={error} />
                </div>
                <div className={styles.productImage}>
                    <div className={styles.dropArea}>
                        <img
                            className={isDndActive ? styles.dndActive : ""}
                            alt=""
                            src={form["image"] ?? dndImage}
                            draggable
                            onDragEnter={dndEnterOver}
                            onDragOver={dndEnterOver}
                            onDragLeave={dndLeaveDrop}
                            onDrop={dndDrop}
                        />
                    </div>
                    <label className={styles.inputFile}>
                        <span>Выберите файл</span>
                        <input type="file" accept="image\*" onChange={handlerImage} />
                    </label>
                </div>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <SubmitButton onClick={asyncSendSaleInfo}>Выставить на продажу</SubmitButton>
                </div>
            </div>
        </div>
    );
}