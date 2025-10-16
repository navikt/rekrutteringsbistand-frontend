import{ak as I,al as w,j as t,R as k,S as j,c7 as x,cy as b,c9 as g,cK as u,aK as y,cL as _}from"./iframe-BXziY_Zi.js";import{w as d,c as D}from"./ContextDecorators-BLbx3v14.js";import{F as N,A as v}from"./FullførtStilling-Dub70kd0.js";import{R as T}from"./GjenåpneStillingKnapp-DxcYgFFm.js";import{T as A}from"./TilgangskontrollForInnhold-BICMzcfh.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CyAXKXv4.js";import"./OrganisasjonsnummerAlert-JCFq03jU.js";import"./VStack-BfV9VSAn.js";import"./BasePrimitive-Ov_Zozgq.js";import"./List-_K5Vmu90.js";import"./Link-4XsaCY8h.js";import"./KandidatHendelseTag-CrFMkKI_.js";import"./Tag-27IIFXKU.js";import"./FileXMark-C4GrZGwO.js";import"./Trash-DAtihogT.js";import"./HandShakeHeart-zB5wL4zo.js";import"./Calendar-D53PpRMk.js";import"./ThumbUp-B6tdJAUa.js";import"./Table-BAh0mp6c.js";import"./util-BjIecu4N.js";import"./format-B1cmwU2D.js";import"./match-C_z_8etj.js";import"./parse-DkXjFss9.js";import"./getDefaultOptions-O6SvB0vf.js";import"./parseISO-Chp8ZZ_L.js";import"./util-DEIDtFt4.js";import"./accordion-6SroLCqt.js";import"./index-BcpoZZPb.js";import"./index-BlRVwd-K.js";import"./index-JjGD8kTO.js";import"./ChevronDown-CicwSVMz.js";import"./Box-Yhx91k17.js";import"./Bell-C6DQ6iko.js";import"./PersonChat-XnoN1tOq.js";import"./Eye-Dj4X5L7G.js";import"./ProgressBar-BN8KAaon.js";import"./EyeSlash-Bs68fLr2.js";import"./CircleSlash-DPW9S22V.js";import"./Modal-Byk1nq5S.js";import"./floating-ui.react-DmgCcC2w.js";import"./Date.Input-hiWrJIWD.js";import"./useFormField-D4xFFkD-.js";import"./useControllableState-D5oGLZjf.js";import"./Modal.context-DkZACfZM.js";import"./Checkbox-CKym95YE.js";import"./Fieldset-Cro0Yf3w.js";import"./Pencil-CVsIwGNk.js";import"./PersonbrukerTekst-DNx8uKu3.js";import"./ClockDashed-D6nUup26.js";import"./Tasklist-1TOa7AEV.js";import"./ErrorBoundary-Bg4lqu8N.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=B+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:K,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
