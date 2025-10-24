import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DyjxJt6_.js";import{w as m,c as D}from"./ContextDecorators-N4SXPDP4.js";import{F as N,A as v}from"./FullførtStilling-HMJLra3I.js";import{R as T}from"./GjenåpneStillingKnapp-BCELeGrU.js";import{T as A}from"./TilgangskontrollForInnhold-CU3MFSUc.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DzVT8GY0.js";import"./OrganisasjonsnummerAlert-B1LbYRzk.js";import"./VStack-k6rjAcI6.js";import"./BasePrimitive-DD5QSJl_.js";import"./List-DbvLH4Xd.js";import"./Link-BQyKaBg8.js";import"./KandidatHendelseTag-Bn-bF2SW.js";import"./Tag-jVQ027fS.js";import"./ChatExclamationmark-_zjEuLjb.js";import"./FileXMark-BP7zxZnt.js";import"./Trash-CKc4iBLw.js";import"./HandShakeHeart-QphpuF16.js";import"./Calendar-Be9HdFY7.js";import"./ThumbUp-BxYAF2fV.js";import"./Table-5qzdeWed.js";import"./util-u2KN_oDe.js";import"./format-DiYK34ra.js";import"./match-r7-eMgNP.js";import"./parse-Cbdomb8H.js";import"./getDefaultOptions-CGyA5tp4.js";import"./parseISO-CQvy-Q--.js";import"./util-B55YeDai.js";import"./accordion-C79Pd6C7.js";import"./index-In8F_zz2.js";import"./index-CvZwYGEU.js";import"./index-bq0XZk7b.js";import"./ChevronDown-B-gXgea7.js";import"./Box-BvRQkeon.js";import"./Bell-oOF9ZsTc.js";import"./PersonChat-BVwSsXAz.js";import"./Eye-BFl2k_VM.js";import"./ProgressBar-DwiLvsIU.js";import"./EyeSlash-QhUx-cqV.js";import"./CircleSlash-BBzMWUtv.js";import"./Modal-fk5W3duk.js";import"./floating-ui.react-DwC01zyt.js";import"./Date.Input-hLEnjT2L.js";import"./useFormField-RkUFhjyk.js";import"./useControllableState-DyBNm6ng.js";import"./Modal.context-DsW8rZaM.js";import"./Checkbox-Cmp1pKGs.js";import"./Fieldset-CTXv0Nwf.js";import"./Pencil-CDlKP2r8.js";import"./PersonbrukerTekst-BzUYo0ET.js";import"./ClockDashed-DtgzlOCZ.js";import"./Tasklist-6spqGU6r.js";import"./ErrorBoundary-C6fu-jDZ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
