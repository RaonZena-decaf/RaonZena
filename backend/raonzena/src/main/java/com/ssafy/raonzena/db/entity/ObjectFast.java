package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "object_fast")
public class ObjectFast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "object_no", nullable = false)
    private Integer objectNo;

    @Column(name = "image", nullable = false, length = 500)
    private String image;

}